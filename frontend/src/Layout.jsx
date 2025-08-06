// src/Layout.jsx
import Navbar from "./Components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
