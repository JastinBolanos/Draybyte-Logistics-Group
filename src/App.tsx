/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthModal } from './components/AuthModal';
import { ShipmentModal } from './components/ShipmentModal';
import { NewShipmentModal } from './components/NewShipmentModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { SidebarRail, FooterStatusStrip } from './components/layout';
import { MainContentArea } from './components/views';

import {
  useLogisticsState,
  useTelemetrySimulation,
  useAuthSession,
  useNavigationState
} from './hooks';

export default function App() {
  // Application & Domain State Hooks
  const {
    vehicles,
    setVehicles,
    shipments,
    inventory,
    warehouses,
    incidents,
    kpis,
    selectedVehicleId,
    selectedShipment,
    setSelectedShipment,
    handleSelectVehicle,
    handleRerouteVehicle,
    handleContactDriver,
    handleCreateShipment,
    handleUpdateShipmentStatus,
    handleResolveIncident,
    handleStockTransfer,
    handleRestockItem
  } = useLogisticsState();

  const {
    isSimulating,
    setIsSimulating,
    lastSyncTime,
    handleManualRefresh
  } = useTelemetrySimulation(vehicles, setVehicles);

  const {
    userSession,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authInitialMode,
    handleOpenAuth,
    handleLoginSuccess,
    handleEnterDemoMode,
    handleSignOut
  } = useAuthSession();

  const {
    isWelcomeViewOpen,
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
  } = useNavigationState();

  // On new shipment created, navigate to shipments tab
  const onShipmentCreated = (newShipment: Parameters<typeof handleCreateShipment>[0]) => {
    handleCreateShipment(newShipment);
    setActiveTab('shipments');
  };

  // Welcome Screen Portal
  if (isWelcomeViewOpen) {
    return (
      <>
        <WelcomeScreen
          kpis={kpis}
          onEnterConsole={handleEnterConsole}
          onOpenAuth={handleOpenAuth}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(session) => {
            handleLoginSuccess(session);
            handleEnterConsole();
          }}
          onEnterDemoMode={() => {
            handleEnterDemoMode();
            handleEnterConsole('fleet');
          }}
          initialMode={authInitialMode}
        />
      </>
    );
  }

  // Main Command & Control Platform Layout
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* Interface Left Sidebar Rail */}
      <SidebarRail
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenWelcome={handleOpenWelcome}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50">
        {/* Top Command & Navigation Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          kpis={kpis}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          isDense={isDense}
          setIsDense={setIsDense}
          onNewShipment={handleOpenNewShipment}
          onScanBarcode={handleOpenScanModal}
          lastSyncTime={lastSyncTime}
          onManualRefresh={handleManualRefresh}
          onOpenWelcome={handleOpenWelcome}
          userSession={userSession}
          onOpenAuth={handleOpenAuth}
          onSignOut={() => {
            handleSignOut();
            handleOpenWelcome();
          }}
        />

        {/* Dynamic Domain Views */}
        <MainContentArea
          activeTab={activeTab}
          isDense={isDense}
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          onSelectVehicle={handleSelectVehicle}
          onRerouteVehicle={handleRerouteVehicle}
          onContactDriver={handleContactDriver}
          shipments={shipments}
          onSelectShipment={setSelectedShipment}
          onNewShipment={handleOpenNewShipment}
          onScanBarcode={handleOpenScanModal}
          warehouses={warehouses}
          inventory={inventory}
          onStockTransfer={handleStockTransfer}
          onRestockItem={handleRestockItem}
          incidents={incidents}
          onResolveIncident={handleResolveIncident}
          kpis={kpis}
        />

        {/* Footer Status Strip */}
        <FooterStatusStrip />
      </main>

      {/* Modals & Dialogs */}
      <ShipmentModal
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onUpdateStatus={handleUpdateShipmentStatus}
      />

      <NewShipmentModal
        isOpen={isNewShipmentOpen}
        onClose={handleCloseNewShipment}
        onCreateShipment={onShipmentCreated}
        vehicles={vehicles}
        warehouses={warehouses}
      />

      <BarcodeScannerModal
        isOpen={isScanModalOpen}
        onClose={handleCloseScanModal}
        shipments={shipments}
        onSelectShipment={setSelectedShipment}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(session) => {
          handleLoginSuccess(session);
          handleEnterConsole();
        }}
        onEnterDemoMode={() => {
          handleEnterDemoMode();
          handleEnterConsole('fleet');
        }}
        initialMode={authInitialMode}
      />
    </div>
  );
}

