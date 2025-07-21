import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const passwordSchema = z.string().min(8, "Password must be at least 8 characters").refine((val) => /[0-9]/.test(val), {
    message: "Password must include a digit [0-9]",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must include an uppercase letter [A-Z]",
  })
  .refine((val) => /[!@#$-]/.test(val), {
    message: "Password must include a special character [!@#$-]",
  });

const schema = z.object({
  email: z.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses are allowed"),
  password: passwordSchema,
});


const Form = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, watch, formState: { errors }, } = useForm({
    resolver: zodResolver(schema),
  });

  
  const email = watch("email") || "";
  const password = watch("password") || "";

 
  const onSubmit = (data) => {
   
    navigate("/map");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <Typography color="red">{errors.email.message}</Typography>
          )}

        
          <Box
            mt={1}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            flexWrap="wrap"
          >
            {!/^[a-zA-Z0-9._%+-]+@gmail\.com$/ && email && (
              <Typography
                sx={{
                  color: email ? (!errors.email ? "green" : "red") : "gray",
                  fontSize: "14px",
                }}
              >
             {errors.email.message}
              </Typography>
            )}
          </Box>

         
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <Typography color="red">{errors.password.message}</Typography>   
          )}

          
          <Box
            mt={1}
            display="flex"
            flexDirection="row"
            justifyContent="end"
            flexWrap="wrap"
          >
            <Typography
              sx={{
                color: password ?  password.length >= 8 ? "green" : "red" : "gray",
                fontSize: "14px",
              }}
            >
              Password must be at least 8 characters
            </Typography>
            <Typography
              sx={{
                color: password ? /[0-9]/.test(password) ? "green" : "red" : "gray",
                fontSize: "14px",
              }}
            >
              • [0-9]
            </Typography>
            <Typography
              sx={{
                color: password ? /[A-Z]/.test(password) ? "green" : "red" : "gray",
                fontSize: "14px",
              }}
            >
              • [A-Z]
            </Typography>
            <Typography
              sx={{
                color: password ? /[!@#$-]/.test(password) ? "green" : "red" : "gray",
                fontSize: "14px",
              }}
            >
              • [!@#$-]
            </Typography>
          </Box>

         
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Form;
