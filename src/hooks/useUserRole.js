// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/axiosSecure";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

// const useUserRole = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const { data: role, isLoading } = useQuery({
//     queryKey: ["user-role", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/role/${user.email}`);
//       return res.data.role;
//     },
//   });

//   return [role, isLoading];
// };

// export default useUserRole;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/axiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: userLoading } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !userLoading,
    staleTime: 0,
    queryFn: async () => {
      const email = user.email.toLowerCase();
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading: isLoading || userLoading };
};

export default useUserRole;
