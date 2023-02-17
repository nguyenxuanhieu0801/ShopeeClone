import Footer from '~/components/Footer';
import AuthHeader from '~/components/AuthHeader';

interface AuthLayoutProps {
  children?: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <AuthHeader />
      {children}
      <Footer />
    </div>
  );
};
export default AuthLayout;
