import Footer from '~/components/Footer';
import Header from '~/components/Header';

interface MainProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
