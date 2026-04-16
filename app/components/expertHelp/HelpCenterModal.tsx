"use client";

import { useState, useEffect } from "react";
import styles from "@/app/components/expertHelp/styles/ExpertHelp.module.css";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";

import { addExpertHelp } from "@/store/slices/features/expert_help/expertHelpSlice";

import {
  fetchCities,
  fetchAreas,
  fetchLocalities,
  resetAllLocationData,
} from "@/store/slices/features/location/locationSlice";
import { showToast } from "@/utils/toast";

export default function ExpertHelpModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { cities, areas, localities } = useSelector(
    (state: RootState) => state.location
  );

  /* ================= STATE ================= */

  const [formData, setFormData] = useState({
    you_want_to: "",
    property_type: "",
    residential_type: "",
    location_id: "",
    your_requirements: "",
  });

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [selectedLocalityId, setSelectedLocalityId] =
    useState<number | null>(null);

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (openModal) {
      dispatch(fetchCities());
    } else {
      dispatch(resetAllLocationData());
    }
  }, [openModal, dispatch]);

  /* ================= COMMON CHANGE ================= */

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ================= CITY ================= */

  const handleCityChange = (e: any) => {
    const cityId = Number(e.target.value);
    const selectedCity = cities.find((c: any) => c.id === cityId);

    setSelectedCityId(cityId);
    setSelectedAreaId(null);
    setSelectedLocalityId(null);

    handleChange("location_id", cityId); // fallback

    if (selectedCity?.has_area === 1) {
      dispatch(fetchAreas({ id: cityId }));
    } else {
      dispatch(fetchLocalities({ cityId }));
    }
  };

  /* ================= AREA ================= */

  const handleAreaChange = (e: any) => {
    const areaId = Number(e.target.value);

    setSelectedAreaId(areaId);
    handleChange("location_id", areaId);

    dispatch(
      fetchLocalities({
        cityId: Number(selectedCityId),
        areaId,
      })
    );
  };

  /* ================= LOCALITY ================= */

  const handleLocalityChange = (e: any) => {
    const localityId = Number(e.target.value);

    setSelectedLocalityId(localityId);
    handleChange("location_id", localityId);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {
    console.log("Final API Data:", formData);

    dispatch(addExpertHelp(formData));
    showToast("Your request has been submitted! We'll get back to you soon.", "success")
    setOpenModal(false)
  };

  if (!openModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Get Expert Help</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setOpenModal(false)}
          >
            <X size={18} />
          </button>
        </div>

        <p className={styles.subText}>
          Let us know more details about your requirement.
        </p>

        {/* YOU WANT TO */}
        <div className={styles.section}>
          <label>You Want to</label>
          <div className={styles.btnGroup}>
            {["Sell", "Buy", "Rent"].map((item) => (
              <button
                key={item}
                className={
                  formData.you_want_to === item ? styles.active : ""
                }
                onClick={() => handleChange("you_want_to", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* PROPERTY TYPE */}
        <div className={styles.section}>
          <label>Property Type</label>
          <div className={styles.btnGroup}>
            {["Residential", "Commercial"].map((item) => (
              <button
                key={item}
                className={
                  formData.property_type === item ? styles.active : ""
                }
                onClick={() => handleChange("property_type", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* PROPERTY SIZE */}
        <div className={styles.section}>
          <label>Property Size</label>
          <div className={styles.btnGroup}>
            {["2BHK", "3BHK", "Others"].map((item) => (
              <button
                key={item}
                className={
                  formData.residential_type === item ? styles.active : ""
                }
                onClick={() =>
                  handleChange("residential_type", item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* CITY */}
        <div className={styles.section}>
          <label>City</label>
          <select
            className={styles.select}
            value={selectedCityId || ""}
            onChange={handleCityChange}
          >
            <option value="">Select City</option>
            {cities?.map((city: any) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* AREA */}
        {cities.find((c: any) => c.id === selectedCityId)?.has_area ===
          1 && (
          <div className={styles.section}>
            <label>Area</label>
            <select
              className={styles.select}
              value={selectedAreaId || ""}
              onChange={handleAreaChange}
            >
              <option value="">Select Area</option>
              {areas?.map((area: any) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* LOCALITY */}
        <div className={styles.section}>
          <label>Locality</label>
          <select
            className={styles.select}
            value={selectedLocalityId || ""}
            onChange={handleLocalityChange}
          >
            <option value="">Select Locality</option>
            {localities?.map((loc: any) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* REQUIREMENT */}
        <div className={styles.section}>
          <label>Your Requirements</label>
          <textarea
            value={formData.your_requirements}
            onChange={(e) =>
              handleChange("your_requirements", e.target.value)
            }
            placeholder="e.g. Looking for a 2BHK in a gated society with parking and metro access..."
          />
        </div>

        {/* SUBMIT */}
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}