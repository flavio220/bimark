import Header from '@/components/common/Header';
import LoginInteractive from './components/LoginInteractive';

export const metadata = {
  title: 'User Login - BiMarK',
  description: 'Sign in to your BiMarK account to access your buyer or seller dashboard. Secure authentication with bilingual French-English support for international B2B and B2C marketplace.',
};

export default function UserLoginPage() {
  return (
    <>
      <Header />
      <LoginInteractive />
    </>
  );
}