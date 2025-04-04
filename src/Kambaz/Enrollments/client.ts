import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const getEnrollmentsForUser = async (userId: string) => {
    console.log("Getting enrollments for user", userId);
    console.log("Making request to ", `${ENROLLMENTS_API}/${userId}`);
    const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
    return data;
}

export const enrollUserInCourse = async (enrollment: { user: string, course: string }) => {
    const { data } = await axios.post(ENROLLMENTS_API, enrollment);
    return data;
};

export const deleteEnrollment = async (enrollmentId: string) => {
    const { data } = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
    return data;
};