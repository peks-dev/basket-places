const AuthHeader = ({ headingText }) => {
  return (
    <header className="auth-form__header">
      <picture className="auth-form__img-container">
        <img src="/images/logo-site.png" alt="basket places logo" />
      </picture>
      <h2 className="auth-form__title">{headingText}</h2>
    </header>
  );
};

export default AuthHeader;
