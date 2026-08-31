import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ShieldCheck,
  Building2,
  Phone,
  Truck,
  FileText,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Radio,
  Compass,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export interface UserSession {
  email: string;
  name?: string;
  company?: string;
  role: 'director' | 'dispatch' | 'security' | 'guest';
  isDemo: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
  onEnterDemoMode: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onEnterDemoMode,
  initialMode = 'login'
}) => {
  const { t, language } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register' | 'register_success'>(initialMode);
  
  // Login Form State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Register Form State
  const [fullName, setFullName] = useState<string>('');
  const [workEmail, setWorkEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [taxId, setTaxId] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [fleetSize, setFleetSize] = useState<string>('medium');
  const [roleDepartment, setRoleDepartment] = useState<string>('logistics');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [isSubmittingRegister, setIsSubmittingRegister] = useState<boolean>(false);
  const [registeredData, setRegisteredData] = useState<{ email: string; company: string; name: string } | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!email.trim()) {
      setLoginError(language === 'es' ? 'Por favor ingrese su correo electrónico institucional.' : 'Please enter your corporate email address.');
      return;
    }
    if (!password.trim()) {
      setLoginError(language === 'es' ? 'Por favor ingrese su contraseña de acceso.' : 'Please enter your password.');
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setLoginError(t.auth.loginErrorUnauthorized);
      setPassword('');
    }, 750);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !workEmail || !companyName) {
      alert(language === 'es' ? 'Por favor complete todos los campos requeridos (*)' : 'Please complete all required fields (*)');
      return;
    }

    setIsSubmittingRegister(true);
    setTimeout(() => {
      setIsSubmittingRegister(false);
      setRegisteredData({
        email: workEmail,
        company: companyName,
        name: fullName
      });
      setMode('register_success');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-full max-w-xl overflow-hidden my-6 relative text-slate-800"
      >
        {/* Modal Top Header Bar */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider border border-indigo-400/40">
              DB
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs tracking-widest uppercase font-mono-tech text-slate-100">
                  Draybyte Logistics Group
                </span>
                <span className="text-[9px] bg-indigo-900/80 text-indigo-300 px-1.5 py-0.2 rounded font-mono-tech border border-indigo-700/50">
                  TLS 1.3 SECURE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                {mode === 'register' ? t.auth.registerTitle : t.auth.loginTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-7 max-h-[85vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* VIEW 1: LOGIN SCREEN */}
            {mode === 'login' && (
              <motion.div
                key="login-screen"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Editorial Eyebrow & Title */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono-tech font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                    <span>TORRE DE MANDO • ACCESO AUTORIZADO</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
                    {t.auth.loginTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">
                    {t.auth.loginSubtitle}
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Form Elements */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans">
                      {t.auth.emailLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.auth.emailPlaceholder}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700 font-sans">
                        {t.auth.passwordLabel}
                      </label>
                      <button
                        type="button"
                        onClick={() => alert(language === 'es' ? 'Para restablecimiento de credenciales, contacte al administrador de soporte en su organización.' : 'For password resets, contact your organizational IT support administrator.')}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 hover:underline font-sans cursor-pointer"
                      >
                        {t.auth.forgotPassword}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.auth.passwordPlaceholder}
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{t.auth.rememberMe}</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    id="btn-submit-login"
                    className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white rounded-xl font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isAuthenticating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>{language === 'es' ? 'Validando...' : 'Authenticating...'}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-indigo-400" />
                        <span>{t.auth.btnLogin}</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Sub-actions Section: Registration Request & Non-Client / Telemetry Demo Option */}
                <div className="pt-5 border-t border-slate-200 space-y-4">
                  {/* Option 1: Request Registration */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block font-sans">
                        {t.auth.noAccountPrompt}
                      </span>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                        {language === 'es' 
                          ? 'Solicita una cuenta corporativa para tu empresa y flota.' 
                          : 'Request a corporate account for your enterprise fleet.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="px-3.5 py-2 bg-white hover:bg-slate-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold font-sans transition-colors shrink-0 shadow-2xs cursor-pointer"
                    >
                      {t.auth.requestRegistration}
                    </button>
                  </div>

                  {/* Option 2: Non-Client / Telemetry Satelital Demo Option (AS SPECIFICALLY REQUESTED) */}
                  <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                    <div className="flex items-center space-x-2 text-indigo-950 font-bold text-xs font-sans">
                      <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{t.auth.notClientPrompt}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                      {t.auth.viewTelemetryNote}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onEnterDemoMode();
                        onClose();
                      }}
                      id="btn-view-telemetry-demo"
                      className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
                      <span>{t.auth.viewTelemetryDemo}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: REGISTRATION FORM */}
            {mode === 'register' && (
              <motion.div
                key="register-screen"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-mono-tech font-bold uppercase tracking-wider mb-2">
                    <Building2 className="w-3 h-3" />
                    <span>ONBOARDING CORPORATIVO • VALIDACIÓN MANUAL</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
                    {t.auth.registerTitle}
                  </h3>
                  <div className="mt-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-[11px] flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-sans">
                      {t.auth.registerSubtitle}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                        {t.auth.fullName} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t.auth.fullNamePlaceholder}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                        {t.auth.workEmail} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder={t.auth.workEmailPlaceholder}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                        {t.auth.companyName} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder={t.auth.companyNamePlaceholder}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                        {t.auth.taxId}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          placeholder={t.auth.taxIdPlaceholder}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                        {t.auth.phone}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.auth.phonePlaceholder}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                        {t.auth.fleetSize}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Truck className="w-3.5 h-3.5" />
                        </div>
                        <select
                          value={fleetSize}
                          onChange={(e) => setFleetSize(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        >
                          <option value="small">{t.auth.fleetSizeSmall}</option>
                          <option value="medium">{t.auth.fleetSizeMedium}</option>
                          <option value="large">{t.auth.fleetSizeLarge}</option>
                          <option value="enterprise">{t.auth.fleetSizeEnterprise}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                      {t.auth.roleDepartment}
                    </label>
                    <select
                      value={roleDepartment}
                      onChange={(e) => setRoleDepartment(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                    >
                      <option value="logistics">{t.auth.roleLogistics}</option>
                      <option value="traffic">{t.auth.roleTraffic}</option>
                      <option value="security">{t.auth.roleSecurity}</option>
                      <option value="coldChain">{t.auth.roleColdChain}</option>
                      <option value="customs">{t.auth.roleCustoms}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                      {t.auth.specialRequirements}
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder={t.auth.specialRequirementsPlaceholder}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingRegister}
                      id="btn-submit-registration"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmittingRegister ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>{t.auth.submitting}</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>{t.auth.btnSubmitRegistration}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="pt-3 text-center border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-sans">
                    {t.auth.haveAccountPrompt}{' '}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold font-sans underline cursor-pointer"
                  >
                    {t.auth.backToLogin}
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: REGISTRATION SUCCESSFUL / MANUAL SUPPORT VALIDATION NOTICE */}
            {mode === 'register_success' && (
              <motion.div
                key="register-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-4 space-y-5"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-950 tracking-tight font-sans">
                    {t.auth.successTitle}
                  </h3>
                  <span className="text-xs font-mono-tech text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mt-2">
                    {t.auth.successNotice}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
                  <p className="text-slate-600 font-sans leading-relaxed">
                    {t.auth.successMessage}
                  </p>
                  
                  {registeredData && (
                    <div className="pt-2 border-t border-slate-200/80 font-mono-tech text-[11px] text-slate-700 space-y-1">
                      <div><strong>{language === 'es' ? 'Empresa:' : 'Company:'}</strong> {registeredData.company}</div>
                      <div><strong>{language === 'es' ? 'Solicitante:' : 'Applicant:'}</strong> {registeredData.name}</div>
                      <div><strong>{t.auth.successEmailSent}</strong> <span className="text-indigo-600 font-bold">{registeredData.email}</span></div>
                      <div className="flex items-center gap-1 text-slate-500 pt-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{language === 'es' ? 'Tiempo estimado de validación: entre 24 a 48 hrs hábiles' : 'Estimated review time: 24 to 48 business hours'}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onEnterDemoMode();
                      onClose();
                    }}
                    className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <span>{t.auth.successExploreNow}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t.auth.successReturnLogin}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
