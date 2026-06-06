
const CVBuilderLayout = ({ children }) => {
  return (
    <div className="flex-1 w-full h-[calc(100vh-64px)] max-w-[1600px] mx-auto p-3 sm:p-6 md:p-8 flex flex-col overflow-hidden">
      {children}
    </div>
  );
};

export default CVBuilderLayout;