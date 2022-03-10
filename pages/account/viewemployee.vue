<template>
    <div>
        <navbar />

        <EmployeeInfo :employee-id="$route.query.id" />

    </div>
</template>

<script>

export default {
  name: 'ViewTicket',
  // middleware: 'auth'
}
</script>