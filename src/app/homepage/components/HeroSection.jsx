'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection({ slides, currentLanguage }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides?.length]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides?.[currentSlide];

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src={currentSlideData?.image}
          alt={currentSlideData?.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentSlideData?.title?.[currentLanguage]}
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            {currentSlideData?.description?.[currentLanguage]}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/product-search-results"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
            >
              {currentLanguage === 'en' ? 'Browse Products' : 'Parcourir les produits'}
            </Link>
            <Link
              href="/user-registration"
              className="px-6 py-3 bg-white text-primary rounded-md font-medium hover:bg-gray-100 transition-smooth"
            >
              {currentLanguage === 'en' ? 'Start Selling' : 'Commencer à vendre'}
            </Link>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-smooth"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeftIcon" size={20} className="text-primary" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-smooth"
        aria-label="Next slide"
      >
        <Icon name="ChevronRightIcon" size={20} className="text-primary" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  slides: PropTypes?.arrayOf(
    PropTypes?.shape({
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      title: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
      description: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
    })
  )?.isRequired,
  currentLanguage: PropTypes?.string?.isRequired,
};