"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import styles from "@/app/components/ReviewsSection/style.module.css";

const staticReviews = [
  { name: "Rahul Sharma", rating: 5, comment: "Excellent service and very professional." },
  { name: "Priya Verma", rating: 5, comment: "Helped us find our dream home quickly." },
  { name: "Amit Singh", rating: 4, comment: "Good experience overall." },
  { name: "Sneha Kapoor", rating: 5, comment: "Very responsive and trustworthy agent." },
  { name: "Vikas Jain", rating: 5, comment: "Highly recommended for Noida properties." },
  { name: "Neha Arora", rating: 4, comment: "Smooth process and helpful team." },
  { name: "Rohit Mehta", rating: 5, comment: "Best real estate consultant in NCR." },
  { name: "Anjali Gupta", rating: 5, comment: "Very professional and transparent." },
  { name: "Karan Malhotra", rating: 1, comment: "Communication could be better." },
  { name: "Simran Kaur", rating: 2, comment: "Average experience." },
];

export default function ReviewsSection() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;

  const totalReviews = staticReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const averageRating =
    staticReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  const ratingCount = (star: number) =>
    staticReviews.filter((r) => r.rating === star).length;

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = staticReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

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
                  size={22}
                  fill={i < Math.round(averageRating) ? "#facc15" : "none"}
                  stroke="#facc15"
                />
              ))}
            </div>

            <p style={{ color: "grey" }}>{totalReviews} reviews</p>
          </div>

          <div className={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCount(star);
              const percentage = (count / totalReviews) * 100;

              return (
                <div key={star} className={styles.barRow}>
                  <span style={{ color: "grey" }}>{star} ★</span>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* WRITE REVIEW */}
        <button
          className={styles.writeBtn}
          onClick={() => setOpen(!open)}
        >
          Write Review
        </button>

        {open && (
          <div className={styles.reviewForm}>
            <textarea placeholder="Write your review..." />
            <button className={styles.submitBtn}>
              Submit Review
            </button>
          </div>
        )}

        {/* REVIEWS LIST */}
        <div className={styles.reviewList}>
          {currentReviews.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <h4 style={{ fontWeight: "bold" }}>{review.name}</h4>
                <div className={styles.starRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#facc15" : "none"}
                      stroke="#facc15"
                    />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}