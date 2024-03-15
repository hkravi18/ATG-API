const handleValidation = (username, email, password, act) => {
  if (!username || !password || (act === "signup" && !email)) {
    return {
      valid: false,
      error: "Please fill all the fields",
    };
  }

  if (username.length < 8) {
    return {
      valid: false,
      error: "Username needs to be at least 8 characters",
    };
  }

  if (act === "signup" && /^\S+@\S+\.\S+$/.test(email) === false) {
    return {
      valid: false,
      error: "Please enter a valid email address",
    };
  }

  return {
    valid: true,
    meesage: "All fields are correctly filled",
  };
};

module.exports = handleValidation;
