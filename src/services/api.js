
export const loginAPI = async (credentials) => {
  try {
    if(credentials.username === "naval.ravikant" && credentials.password === "05111974") {
      return {success: true, message:"Login successful"}
    }
    else {
      return {success: false, message: "Wrong Credentials"}
    }
  }
  catch(error) {
    throw error;
  }
}