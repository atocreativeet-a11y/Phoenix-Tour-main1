import { useState } from 'react';

interface UseApplyTourModalReturn {
  isOpen: boolean;
  selectedTour: any | null;
  openModal: (tour?: any) => void;
  closeModal: () => void;
}

export default function useApplyTourModal(): UseApplyTourModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any | null>(null);

  const openModal = (tour?: any) => {
    setSelectedTour(tour || null);
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTour(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return {
    isOpen,
    selectedTour,
    openModal,
    closeModal,
  };
}