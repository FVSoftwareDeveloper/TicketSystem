export default class fetchApi{

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
    async getEmployeeStatus( $axios ){

        try{
            return await $axios.get(`/api/auth/AllEmployeeStatus`);          
        }catch(e){
            throw new Error(e);
        }
        
    }

    /**
     * Method to save employee
     * @param {*} info 
     * @param {*} $axios 
     * @returns 
     */
    async saveEmployees(info, $axios){

        try{
            return await $axios.post(`/api/auth/Employees`,{
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                status: info.status,
                password: info.password,
                password_confirm: info.confirmPassword
            }); 
        }catch(e){
            throw new Error(e);
        }
         
    }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async getAllEmployees( $axios ){

        try{
            return await $axios.get(`/api/auth/AllEmployees`);       
        }catch(e){
            throw new Error(e);
        }
         
     }


     /**
     * Method to save employee
     * @param {*} info 
     * @param {*} $axios 
     * @returns 
     */
    async updateEmployees(info, $axios){

        try{
            return await $axios.put(`/api/auth/Employees/${info.idCustomer}`,{
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                status: info.status,
                password: info.password,
                password_confirm: info.confirmPassword
            }); 
        }catch(e){
            throw new Error(e);
        }
    }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async getEmployeeById( employeeId, $axios ){

        try{
            return await $axios.get(`/api/auth/Employees/${employeeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async getTiketStatus( $axios ){

        try{
            return await $axios.get(`/api/auth/AllEmployeeStatus`);       
        }catch(e){
            throw new Error(e);
        }
         
     }

    /**
     * Method to save ticket
     * @param {*} info 
     * @param {*} $axios 
     * @returns 
     */
     async saveTikect(info, $axios){

        try{
            return await $axios.post(`/api/auth/Tickets`,{
                ticketDate: info.date_today,
                subject: info.subject,
                status: info.status,
                employee: info.employee,
                reason: info.reason
            }); 
        }catch(e){
            throw new Error(e);
        }

    }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async deleteEmployeeById( employeeId, $axios ){

        try{
            return await $axios.delete(`/api/auth/Employees/${employeeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async getAllTickets( $axios ){

        try{
            return await $axios.get(`/api/auth/AllTickets`);       
        }catch(e){
            throw new Error(e);
        }
         
     }


    /**
     * Method to save employee
     * @param {*} info 
     * @param {*} $axios 
     * @returns 
     */
     async updateTikect(info, $axios){

        try{
            return await $axios.put(`/api/auth/Tickets/${info.idTicket}`,{
                ticketDate: info.date_today,
                subject: info.subject,
                status: info.status,
                employee: info.employee,
                reason: info.reason
            });
        }catch(e){
            throw new Error(e);
        } 
         
    }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async getTicketById( tickeId, $axios ){

        try{
            return await $axios.get(`/api/auth/Tickets/${tickeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }

     /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
      async deleteTicketById( tickeId, $axios ){

        try{
            return await $axios.delete(`/api/auth/Tickets/${tickeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }

     /**
     * Method to save ticket Time
     * @param {*} info 
     * @param {*} $axios 
     * @returns 
     */
      async saveTikectTime(info, $axios){

        try{
            
            return await $axios.post(`/api/auth/TicketTimes`,{
                tickeId: info.idTicket,
                employee: info.employee,
                from: info.from,
                to: info.to,
                reason: info.reason
            });

        } catch(e) {
            throw new Error(e);
        }
            
         
    }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async getTicketTimeByTicketId( tickeId, $axios ){

        try{
            return await $axios.get(`/api/auth/TicketTimes/${tickeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }

     /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
      async getTicketTimeEmployeesByTicketId( tickeId, $axios ){

        try{
            return await $axios.get(`/api/auth/TicketTimesEmployees/${tickeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }

     /**
     * Method to save ticket Time
     * @param {*} info 
     * @param {*} $axios 
     * @returns 
     */
      async updateTikectTime(info, $axios){

        try{
            
            return await $axios.put(`/api/auth/TicketTimes/${info.idTicketTime}`,{
                tickeId: info.idTicket,
                employee: info.employee,
                from: info.from,
                to: info.to,
                reason: info.reason
            });

        } catch(e) {
            throw new Error(e);
        }
            
         
    }

    /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
     async deleteTicketTimeById( tickeTimeId, $axios ){

        try{
            return await $axios.delete(`/api/auth/TicketTimes/${tickeTimeId}`);
        } catch(e){
            throw new Error(e);
        } 
         
     }


     /**
     * Method to retrieve information from API Service and return to frontend about All Employee Status
     * 
     * @param {*} $axios 
     * @returns 
     */
      async getAllTicketsTime( info, $axios ){

        const strDateTime = info.from;
        const myDate = new Date(strDateTime);
        const from = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' +myDate.getDate();

        const strDateTime2 = info.to;
        const myDate2 = new Date(strDateTime2);
        const to = myDate2.getFullYear() + '-' + (myDate2.getMonth()+1) + '-' +myDate2.getDate();

        try{
            return await $axios.get(`/api/auth/AllTicketTimes/${JSON.stringify(from)}/${JSON.stringify(to)}`);       
        }catch(e){
            throw new Error(e);
        }
         
     }


     
}
