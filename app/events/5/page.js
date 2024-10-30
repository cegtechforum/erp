import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const EventDetails = () => {
    const event = {
        eventId: 5,
        eventName: "Placeholder",
        description: "Actual placeholder event.",
        rollNo: "2022103502",
        contact: "567-890-1234",
        organizerName: "Dhino",
        domain: "Logistics",
        status: "upcoming",
        date: "2024-11-20",
        startTime: "10:00",
        endTime: "13:00",
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="border border-gray-300 rounded-lg shadow-md w-1/2">
                <CardMedia
                    component="img"
                    height="140"
                    image="../assets/kurukshetra.jpg" 
                    alt={event.eventName}
                    className="rounded-t-lg" 
                />
                <CardContent className="text-center"> 
                    <div className="mb-4">
                        <Typography variant="h5" component="div" className="text-black font-bold mb-1">
                            {event.eventName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.description}
                        </Typography>
                    </div>
                    <hr className="border-gray-500 mb-4" />

                    <div className="mb-4">
                        <Typography variant="h6" className="font-bold mb-2">Event Details</Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Status:</strong> {event.status}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Date:</strong> {event.date} 
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Time:</strong> {event.startTime} - {event.endTime}
                        </Typography>
                    </div>
                    <hr className="border-gray-500 mb-4" />

                    <div>
                        <Typography variant="h6" className="font-bold mb-2">Organizer Information</Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Name:</strong> {event.organizerName}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Roll No:</strong> {event.rollNo}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Domain:</strong> {event.domain}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                            <strong>Contact:</strong> {event.contact}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventDetails;
