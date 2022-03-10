<template>
    <div>
        <navbar />

        <TicketInfo :ticket-id="$route.query.id" />

    </div>
</template>

<script>

export default {
  name: 'ViewTicket',
  // middleware: 'auth'
}
</script>