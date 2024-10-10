import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, isBefore, startOfToday } from "date-fns";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/cards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";

function ManageTicket() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    image: "",
    title: "",
    date: "",
    location: "",
  });
  const [editTicket, setEditTicket] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredTickets(tickets.slice(startIndex, endIndex));
  }, [tickets, currentPage, itemsPerPage]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets/getTickets`);
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      showAlert("Failed to fetch tickets. Please try again.");
    }
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < tickets.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const validateInput = (name, value) => {
    let updatedValue = value;
    let updatedErrors = { ...errors };

    // Prevent numbers and invalid characters in Title and Location
    if (name === "title" || name === "location") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, ""); // Only allow letters and spaces
    }

    // Validate Date (only future dates)
    if (name === "date") {
      const selectedDate = new Date(value);
      if (isBefore(selectedDate, startOfToday())) {
        updatedErrors.date = "Please select a future date";
      } else {
        delete updatedErrors.date;
      }
    }

    setErrors(updatedErrors);
    return updatedValue;
  };

  const handleNewTicketChange = (e) => {
    const { name, value } = e.target;
    const validatedValue = validateInput(name, value);
    setNewTicket({ ...newTicket, [name]: validatedValue });
  };

  const handleEditTicketChange = (e) => {
    const { name, value } = e.target;
    const validatedValue = validateInput(name, value);
    setEditTicket({ ...editTicket, [name]: validatedValue });
  };

  const addTicket = async () => {
    if (Object.keys(errors).length > 0) {
      showAlert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("/api/tickets/add-ticket", newTicket);
      setTickets([...tickets, response.data.ticket]);
      setNewTicket({ image: "", title: "", date: "", location: "" });
      setIsAddDialogOpen(false);
      showAlert("Ticket added successfully!");
    } catch (error) {
      console.error("Failed to add ticket", error);
      showAlert("Failed to add ticket. Please try again.");
    }
  };

  const updateTicket = async () => {
    if (Object.keys(errors).length > 0) {
      showAlert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/tickets/tickets/${editTicket._id}`,
        editTicket
      );
      setTickets(
        tickets.map((ticket) =>
          ticket._id === editTicket._id ? response.data.ticket : ticket
        )
      );
      setEditTicket(null);
      setIsEditDialogOpen(false);
      showAlert("Ticket updated successfully!");
    } catch (error) {
      console.error("Failed to update ticket", error);
      showAlert("Failed to update ticket. Please try again.");
    }
  };

  const deleteTicket = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await axios.delete(`/api/tickets/tickets/${id}`);
        setTickets(tickets.filter((ticket) => ticket._id !== id));
        showAlert("Ticket deleted successfully!");
      } catch (error) {
        console.error("Failed to delete ticket", error);
        showAlert("Failed to delete ticket. Please try again.");
      }
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  return (
    <Card className="w-full max-w-[1220px] h-screen mx-auto bg-white rounded-lg m-5 shadow-md">
      <CardHeader className="bg-gray-100 p-4">
        <CardTitle className="text-3xl font-semibold text-gray-800">
          Manage Events
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {alertMessage && (
          <Alert className="mb-4">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Events List</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                <Plus className="mr-2 h-5 w-5" /> Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={newTicket.image}
                  onChange={handleNewTicketChange}
                />

                <Input
                  placeholder="Title"
                  name="title"
                  value={newTicket.title}
                  onChange={handleNewTicketChange}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}

                <Input
                  type="date"
                  name="date"
                  value={newTicket.date}
                  onChange={handleNewTicketChange}
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}

                <Input
                  placeholder="Location"
                  name="location"
                  value={newTicket.location}
                  onChange={handleNewTicketChange}
                />
                {errors.location && <p className="text-red-500">{errors.location}</p>}

                <Button
                  onClick={addTicket}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Add Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-1/5">Image</TableHead>
                <TableHead className="w-1/5">Title</TableHead>
                <TableHead className="w-1/5">Date</TableHead>
                <TableHead className="w-1/5">Location</TableHead>
                <TableHead className="w-1/5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow
                  key={ticket._id}
                  className="bg-white hover:bg-gray-50 transition-shadow"
                >
                  <TableCell>
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>{format(new Date(ticket.date), "PP")}</TableCell>
                  <TableCell>{ticket.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditTicket(ticket);
                          setIsEditDialogOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Pencil className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTicket(ticket._id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition px-4 py-2 rounded-md"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Previous
          </Button>
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition px-4 py-2 rounded-md"
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Ticket</DialogTitle>
            </DialogHeader>
            {editTicket && (
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={editTicket.image}
                  onChange={handleEditTicketChange}
                />

                <Input
                  placeholder="Title"
                  name="title"
                  value={editTicket.title}
                  onChange={handleEditTicketChange}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}

                <Input
                  type="date"
                  name="date"
                  value={format(new Date(editTicket.date), "yyyy-MM-dd")}
                  onChange={handleEditTicketChange}
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}

                <Input
                  placeholder="Location"
                  name="location"
                  value={editTicket.location}
                  onChange={handleEditTicketChange}
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location}</p>
                )}

                <Button
                  onClick={updateTicket}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ManageTicket;
