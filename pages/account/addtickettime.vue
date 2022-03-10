<template>
    <div>
        <navbar />

        <TicketTimeForm :ticket-id="$route.query.id" />

    </div>
</template>

<script>

export default {
  name: 'AddTicketTime',
  // middleware: 'auth'
}
</script>