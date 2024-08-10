import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    if (auth.verify_status !== "verified") {
        return <Navigate to="/resend-email" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};


export default ProtectedRoute;