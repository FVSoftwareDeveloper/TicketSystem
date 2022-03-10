<template>
    <div>
        <navbar />

        <TicketForm :ticket-id="$route.query.id" />

    </div>
</template>

<script>

export default {
  name: 'AddTicket',
  // middleware: 'auth'
}
</script>