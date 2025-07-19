
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false); // For sign in
  const [showSignUpPassword, setShowSignUpPassword] = useState(false); // For sign up
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "You have been signed in successfully!",
      });
      onOpenChange(false);
      resetForm();
    } catch (error: unknown) {
      console.error('Supabase signIn error:', error); // Added detailed error logging
      const errMsg = (error as { message?: string })?.message || String(error);
      toast({
        title: "Error",
        description: errMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Please check your email to confirm your account!",
      });
      onOpenChange(false);
      resetForm();
    } catch (error: unknown) {
      console.error('Supabase signUp error:', error); // Added detailed error logging
      const errMsg = (error as { message?: string })?.message || String(error);
      toast({
        title: "Error",
        description: errMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 rounded-xl overflow-hidden">
        <div className="p-8 pb-0 text-center">
          <div className="text-xl font-medium text-[#46612c] leading-tight mb-6">
            To Complete Your Purchase<br />Please Login or Register Here
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex rounded-full bg-[#f99f36] w-[400px] h-[70px] items-center p-2">
              <button
                className={`flex-1 h-full rounded-full text-lg font-medium transition-all ${activeTab === 'login' ? 'bg-[#46612c] text-white shadow-lg' : 'text-[#46612c]'} `}
                style={{ minHeight: 56 }}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 h-full rounded-full text-lg font-medium transition-all ${activeTab === 'register' ? 'bg-[#46612c] text-white shadow-lg' : 'text-[#46612c]'} `}
                style={{ minHeight: 56 }}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          {activeTab === 'login' ? (
            <form onSubmit={handleSignIn} className="space-y-6">
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border-[#46612c] placeholder-[#757575] text-base"
                required
              />
              <div className="relative">
                <Input
                  type={showSignInPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="border-[#46612c] placeholder-[#757575] text-base pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#46612c]"
                  onClick={() => setShowSignInPassword(v => !v)}
                  tabIndex={-1}
                >
                  {/* Eye icon SVG */}
                  {showSignInPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m2.1-2.1A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 2.21-.715 4.25-1.925 5.925M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={v => setRememberMe(v === true)} />
                <label htmlFor="remember-me" className="text-[#46612c] text-base cursor-pointer">Remember Me</label>
              </div>
              <button
                type="submit"
                className="w-[140px] h-[50px] border border-[#46612c] text-[#46612c] text-2xl rounded-none bg-transparent hover:bg-[#46612c] hover:text-white transition-colors"
                style={{ fontFamily: 'inherit' }}
                disabled={loading}
              >
                Log In
              </button>
              <div className="pt-2">
                <a href="#" className="text-[#757575] text-base hover:underline">Lost your password?</a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6">
              <Input
                type="text"
                placeholder="Username"
                value={registerUsername}
                onChange={e => setRegisterUsername(e.target.value)}
                className="border-[#46612c] placeholder-[#757575] text-base"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
                className="border-[#46612c] placeholder-[#757575] text-base"
                required
              />
              <div className="relative">
                <Input
                  type={showSignUpPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={registerPassword}
                  onChange={e => setRegisterPassword(e.target.value)}
                  className="border-[#46612c] placeholder-[#757575] text-base pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#46612c]"
                  onClick={() => setShowSignUpPassword(v => !v)}
                  tabIndex={-1}
                >
                  {/* Eye icon SVG */}
                  {showSignUpPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m2.1-2.1A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 2.21-.715 4.25-1.925 5.925M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={registerConfirmPassword}
                onChange={e => setRegisterConfirmPassword(e.target.value)}
                className="border-[#46612c] placeholder-[#757575] text-base"
                required
                minLength={6}
              />
              <button
                type="submit"
                className="w-[140px] h-[50px] border border-[#46612c] text-[#46612c] text-2xl rounded-none bg-transparent hover:bg-[#46612c] hover:text-white transition-colors"
                style={{ fontFamily: 'inherit' }}
                disabled={loading}
              >
                Register
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
