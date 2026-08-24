import { useState, useCallback } from 'react';
import { ActiveTab } from '../domain/navigation';

export function useNavigationState() {
  const [isWelcomeViewOpen, setIsWelcomeViewOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('fleet');
  const [isDense, setIsDense] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState<boolean>(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);

  const handleEnterConsole = useCallback((targetTab?: ActiveTab) => {
    if (targetTab) {
      setActiveTab(targetTab);
    }
    setIsWelcomeViewOpen(false);
  }, []);

  const handleOpenWelcome = useCallback(() => {
    setIsWelcomeViewOpen(true);
  }, []);

  const handleOpenNewShipment = useCallback(() => {
    setIsNewShipmentOpen(true);
  }, []);

  const handleCloseNewShipment = useCallback(() => {
    setIsNewShipmentOpen(false);
  }, []);

  const handleOpenScanModal = useCallback(() => {
    setIsScanModalOpen(true);
  }, []);

  const handleCloseScanModal = useCallback(() => {
    setIsScanModalOpen(false);
  }, []);

  return {
    isWelcomeViewOpen,
    setIsWelcomeViewOpen,
    activeTab,
    setActiveTab,
    isDense,
    setIsDense,
    searchQuery,
    setSearchQuery,
    isNewShipmentOpen,
    handleOpenNewShipment,
    handleCloseNewShipment,
    isScanModalOpen,
    handleOpenScanModal,
    handleCloseScanModal,
    handleEnterConsole,
    handleOpenWelcome
  };
}
