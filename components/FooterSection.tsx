const FooterSection = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We provide premium interior products to elevate your living
              spaces. Shop from a wide range of carefully curated collections to
              suit all styles and preferences.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: support@example.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
            <p className="text-sm">
              Address: 123 Interior St, Suite 100, City, Country
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-4 border-t border-primary pt-4 text-center text-sm">
          <p>&copy; {date} Luxe Design. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
