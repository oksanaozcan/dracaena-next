"use client";

import React, { useEffect, useState } from 'react';
import { IProductWithReview } from "@/types";
import { StarIcon } from "lucide-react";
import { getCookie } from 'cookies-next';
import axios from 'axios';
import toast from 'react-hot-toast';

interface RatingCardProps {
  item: IProductWithReview
}

export const RatingCard: React.FC<RatingCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedRating, setSelectedRating] = useState(item.review?.rating || 0); // Set initial rating to customer's existing rating if available

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (data: { rating: number, review: string }) => {
    const token = getCookie('dracaena_access_token');

    try {
      if (item.review) {
        // Update existing review
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/review/${item.review.id}`, {
          rating: data.rating,
          comment: data.review
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        toast.success("Review updated successfully");
      } else {
        // Create new review
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
          product_id: item.id,     
          rating: data.rating,
          comment: data.review
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        toast.success("Review added successfully");
      }      
      setSelectedRating(data.rating); // Update the displayed rating
    } catch (err) {      
      toast.error("Something went wrong");     
    } finally {
      closeModal(); // Close the modal after submission
    }    
  };

  const handleReviewDelete = async () => {
    const token = getCookie('dracaena_access_token');

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/review/${item.review?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success("Review removed successfully");
      setSelectedRating(0); // Reset the rating display
    } catch (err) {
      toast.error("Failed to delete the review");
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={item.preview} alt="preview" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.title}</div>
      </div>
      <div className="flex px-6 pt-4 pb-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <StarIcon
            key={rating}
            className={`h-6 w-6 cursor-pointer ${
              selectedRating >= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => openModal()} // Open modal on star click
          />
        ))}
      </div>
      {item.review && (
        <div className="flex justify-between px-6 pt-2 pb-4">
          <button
            className="text-blue-500 text-sm"
            onClick={openModal}
          >
            Edit Review
          </button>
          <button
            className="text-red-500 text-sm"
            onClick={handleReviewDelete}
          >
            Remove Review
          </button>
        </div>
      )}
      {isModalOpen && (
        <RatingFormModal
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          initialRating={selectedRating}
          initialReview={item.review?.comment || ''}
        />
      )}
    </div>
  )
}

interface RatingFormModalProps {
  onClose: () => void;
  onSubmit: (data: { rating: number, review: string }) => void;
  initialRating: number;
  initialReview: string;
}

const RatingFormModal: React.FC<RatingFormModalProps> = ({ onClose, onSubmit, initialRating, initialReview }) => {
  const [selectedRating, setSelectedRating] = useState(initialRating);
  const [reviewText, setReviewText] = useState(initialReview);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating: selectedRating, review: reviewText });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-xl mb-4">How would you rate this product?</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <StarIcon
                key={rating}
                className={`h-6 w-6 cursor-pointer ${
                  selectedRating >= rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => handleStarClick(rating)}
              />
            ))}
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Tell us about your own personal experience taking this product"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-custom-green text-white rounded"
            >
              Save my rating and review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingCard;