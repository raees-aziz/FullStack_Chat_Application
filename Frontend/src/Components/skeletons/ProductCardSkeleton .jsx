import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-sm w-full mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-4 space-y-4">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>

      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
      </div>

      {/* Price Skeleton */}
      <div className="h-5 bg-gray-200 animate-pulse rounded w-1/4"></div>

      {/* Buy Button Skeleton */}
      <div className="h-10 bg-gray-300 animate-pulse rounded-lg w-full"></div>
    </div>
  );
};

export default ProductCardSkeleton;
