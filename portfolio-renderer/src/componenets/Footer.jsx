const Footer = ({ profile, theme }) => {
  return (
    <footer className={`${theme.card} ${theme.cardBorder} mt-16 py-6 text-center text-sm text-gray-500`}>
      <p>&copy; {new Date().getFullYear()} {profile.full_name}. Built with Foliofy.</p>
    </footer>
  );
};

export default Footer;