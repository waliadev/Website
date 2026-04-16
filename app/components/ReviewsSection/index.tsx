"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import styles from "./style.module.css";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchReviews,
  addReview,
} from "@/store/slices/features/review/reviewSlice";

export default function ReviewsSection({ agentId }: { agentId: number }) {
  const dispatch = useAppDispatch();

  // ✅ Redux state
  const { reviews, loading } = useAppSelector(
    (state) => state.review
  );

  console.log(reviews,"reviews")

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ GET API call
  useEffect(() => {
    if (agentId) {
       agentId = Number(agentId.toString()[0]);
      dispatch(fetchReviews(agentId));
    }
  }, [agentId, dispatch]);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviews
      : 0;

  // ✅ POST API
  const handleSubmit = async () => {
    agentId = Number(agentId.toString()[0]);
    await dispatch(
      addReview({
        agent_id: agentId,
        comment,
        rating,
      })
    );

    setOpen(false);
    setComment("");
    setRating(0);
    setStep(1);
  };

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewInner}>
        <h2 className={styles.title}>Ratings & Reviews</h2>

        {/* SUMMARY */}
        <div className={styles.summarySection}>
          <div className={styles.overallRating}>
            <h1>{averageRating.toFixed(1)}</h1>

            <div className={styles.starRow}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.round(averageRating) ? "#facc15" : "none"}
                  stroke="#facc15"
                />
              ))}
            </div>

            <p>{totalReviews} Reviews</p>
          </div>

          {/* RATING BARS */}
          <div className={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => Number(r.rating) === star).length;
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                {
                  console.log(count,percentage)
                }

              return (
                <div key={star} className={styles.barRow}>
                  <span>{star} ★</span>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WRITE REVIEW */}
        <button
          className={styles.writeBtn}
          onClick={() => {
            setOpen(true);
            setStep(1);
          }}
        >
          Write Review
        </button>

        {/* MODAL */}
        {open && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
              <div className={styles.modalHeader}>
                <h3>
                  {step === 1 ? "Write a Review" : "Rate Your Experience"}
                </h3>
                <span onClick={() => setOpen(false)}>✕</span>
              </div>

              <div className={styles.stepIndicator}>
                <span className={step === 1 ? styles.active : ""}>
                  1. Comment
                </span>
                <span>—</span>
                <span className={step === 2 ? styles.active : ""}>
                  2. Rating
                </span>
              </div>

              <div className={styles.modalBody}>
                {step === 1 && (
                  <>
                    <textarea
                      className={styles.textarea}
                      placeholder="Share your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                      className={styles.primaryBtn}
                      disabled={!comment}
                      onClick={() => setStep(2)}
                    >
                      Continue →
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className={styles.starSelect}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={32}
                          fill={star <= rating ? "#facc15" : "none"}
                          stroke="#facc15"
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>

                    <div className={styles.btnRow}>
                      <button onClick={() => setStep(1)}>Back</button>

                      <button
                        className={styles.primaryBtn}
                        disabled={!rating || loading}
                        onClick={handleSubmit}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* REVIEW LIST */}
        <div className={styles.reviewList}>
          {reviews.map((r: any, i: number) => (
            <div key={r.id || i} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.userInfo}>
                  <img
                    src={`https://i.pravatar.cc/40?img=${i + 1}`}
                    className={styles.avatar}
                  />

                  <div>
                    <h4>{r.user_name || "Anonymous"}</h4>

                    <div className={styles.starRow}>
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          fill={j < r.rating ? "#facc15" : "none"}
                          stroke="#facc15"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <span className={styles.time}>Just now</span>
              </div>

              <p className={styles.comment}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}