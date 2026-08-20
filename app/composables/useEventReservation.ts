import type { EventReservationData, EventReservationDetails } from "~/types/meetings";

/** Minimal venue shape the reservation modal needs: a name and a photo */
export interface ReservationVenue {
  name: string;
  image: string;
}

/** "2025-05-24" -> "May 24, 2025" */
function formatDate(value: string) {
  if (!value) {
    return "";
  }
  const [year, month, day] = value.split("-");
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })
    .format(new Date(Number(year), Number(month) - 1, Number(day)));
}

/** "19:00" -> "7:00 PM" */
function formatTime(value: string) {
  if (!value) {
    return "";
  }
  const [hours, minutes] = value.split(":");
  const period = Number(hours) >= 12 ? "PM" : "AM";
  const hour = Number(hours) % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}

/**
 * Shared EventReservationModal / EventReservationSubmittedModal wiring: every
 * venue-showcase section (home, meetings & events page) opens the same pair
 * of modals, pre-filled with whichever venue's "Book Space" was clicked.
 */
export function useEventReservation(defaultVenue: ReservationVenue) {
  const isReservationOpen = ref(false);
  const isSubmittedOpen = ref(false);
  const submittedDetails = ref<EventReservationDetails | undefined>(undefined);
  const selectedVenue = ref<ReservationVenue>(defaultVenue);

  function openReservation(venue: ReservationVenue) {
    selectedVenue.value = venue;
    isReservationOpen.value = true;
  }

  function handleReservationSubmit(data: EventReservationData) {
    submittedDetails.value = {
      date: formatDate(data.date),
      time: formatTime(data.time),
      guests: `${data.guests} Guests`,
      venue: data.venue,
      eventType: data.eventType,
      referenceId: `QHD-${data.date.replaceAll("-", "").slice(2)}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    };
    isReservationOpen.value = false;
    isSubmittedOpen.value = true;
  }

  return {
    isReservationOpen,
    isSubmittedOpen,
    submittedDetails,
    selectedVenue,
    openReservation,
    handleReservationSubmit,
  };
}
