import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/i18n";
import { LogIn, UserPlus, Mail, Lock, AlertCircle, Unlock, ArrowLeft, Send } from "lucide-react";

export const LoginForm: React.FC = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setResetEmailSent(true);
      } else if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      if (errorMessage.includes("invalid-credential")) {
        setError(t.auth.invalidCredentials);
      } else if (errorMessage.includes("email-already-in-use")) {
        setError(t.auth.emailInUse);
      } else if (errorMessage.includes("weak-password")) {
        setError(t.auth.weakPassword);
      } else if (errorMessage.includes("invalid-email")) {
        setError(t.auth.invalidEmail);
      } else if (errorMessage.includes("user-not-found")) {
        setError(t.auth.userNotFound);
      } else {
        setError(t.auth.genericError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className={`w-full max-w-sm rounded-2xl p-6 ${darkMode ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80" : "bg-gradient-to-br from-white/80 to-gray-50/80"} backdrop-blur-sm border ${darkMode ? "border-gray-700/50" : "border-gray-200"} shadow-xl`}>
        <div className="text-center mb-6">
          <div className={`inline-flex p-3 rounded-full mb-4 ${darkMode ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20" : "bg-gradient-to-br from-blue-100 to-purple-100"}`}>
            <Unlock className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
          </div>
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {isForgotPassword ? t.auth.resetPassword : isSignUp ? t.auth.createAccount : t.auth.loginToSeeResults}
          </h2>
          {isForgotPassword && !resetEmailSent && (
            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {t.auth.resetPasswordInfo}
            </p>
          )}
        </div>

        {resetEmailSent ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-500">{t.auth.resetEmailSent}</p>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <p className={`text-sm ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>{t.auth.checkSpam}</p>
            </div>
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setResetEmailSent(false);
                setError("");
              }}
              className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:scale-[0.98] cursor-pointer hover:shadow-blue-500/25 text-white`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.auth.backToLogin}
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {t.auth.email}
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-blue-400" : "text-gray-400 group-focus-within:text-blue-500"}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-800"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder={t.auth.emailPlaceholder}
                  />
                </div>
              </div>

              {!isForgotPassword && (
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {t.auth.password}
                  </label>
                  <div className="relative group">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-blue-400" : "text-gray-400 group-focus-within:text-blue-500"}`} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-800"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder={t.auth.passwordPlaceholder}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              {!isSignUp && !isForgotPassword && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError("");
                    }}
                    className={`text-sm cursor-pointer transition-colors ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"}`}
                  >
                    {t.auth.forgotPassword}
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:scale-[0.98] cursor-pointer hover:shadow-blue-500/25"
                } text-white`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isForgotPassword ? (
                  <>
                    <Send className="w-4 h-4" />
                    {t.auth.resetPassword}
                  </>
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    {t.auth.signUp}
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    {t.auth.signIn}
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              {isForgotPassword ? (
                <button
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError("");
                  }}
                  className={`text-sm cursor-pointer transition-colors ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"}`}
                >
                  {t.auth.backToLogin}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className={`text-sm cursor-pointer transition-colors ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"}`}
                >
                  {isSignUp ? t.auth.alreadyHaveAccount : t.auth.noAccount}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
