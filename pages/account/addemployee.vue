<template>
    <div>
        <navbar />

         <EmployeeForm :employee-id="$route.query.id" />

    </div>
    
</template>

<script>

export default {
  name: 'AddEmployee',
  // middleware: 'auth'
}
</script>