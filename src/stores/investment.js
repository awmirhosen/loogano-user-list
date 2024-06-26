import { defineStore } from "pinia";
import Axios from "axios";
import { reactive } from "vue";

export const useInvestmentStore = defineStore("investment", {
    state: () => ({
        usersData : [],
        userLoading: false
    }),
    actions: {

        converDate(end) {

        end = end.split(" ")

        const endDate = new Date(end[0]);
        const endDateTimestapms = endDate.getTime()

        const endingFa = reactive({
           "day": this.getDateFormat(endDateTimestapms, {"day": "2-digit"}),
           "month": this.getDateFormat(endDateTimestapms, {"month": "numeric"}),
           "monthTitle": this.getDateFormat(endDateTimestapms, {"month": "long"}),
           "year": this.getDateFormat(endDateTimestapms, {"year": "numeric"}),
           "dayWeek": this.getDateFormat(endDateTimestapms, {"weekday": "long"}),
        })
        return `${endingFa.year}/${endingFa.month}/${endingFa.day}`
            
        },

        getDateFormat(uDate, option) {
            let date = new Intl.DateTimeFormat('fa-IR', option).format(uDate);
            return date;
        },

        fetchAllProjectInvestmentUsers() {

            this.userLoading = true;

            Axios.get("https://loogano.com/endpoints/api/panel/project_users", {
                headers: {
                    Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTgwYjU5YzJhNjIzMzEzOTE2MTE2YjM1YWU4NWM4MjhlZTgzZGZkZmQ4NWZiYWUxMjhmOGIxODhlYWExMGZhYTQ5ZmEzMDc1MDQ3YWQwZGYiLCJpYXQiOjE3MTA1NjkzMTAuMzM4NjU0LCJuYmYiOjE3MTA1NjkzMTAuMzM4NjU3LCJleHAiOjE3NDIxMDUzMTAuMzExODYyLCJzdWIiOiIxOCIsInNjb3BlcyI6W119.PZtrcm-viYImQ24aaL-_cVP2ulCg4bnUia3OWzjA-bOW6X_v8bQ5Fb-56P9s3M0X8w6uTV3ZgrHY77I9aP328SOHqJ_DfoEkooTDAkNjCZLaWngm89Q2X8hgTQN4A9nSZgxLiVFycW5eYw8fWIQAIELlNB22Rn8_FdHKs-keU8pMN3ZRMftHXW47MTBJu-ZgMvwSkGaTCAyeFi0ZYcAI1Zh7dliKZjBUnqAiM1l7QnIvnykwveQXOtz-ZrGqY_E2jiS1B9ioED0h7CY81aYxrb-TpzU9KEEB_-8d_O1B9y9K8u_m_gbDySc9uBjWIqkyHBSAshrlBKUe2ZjvA6pBsQ1Gf0TXee703OqEUBA0OU8kqGEkSzxJnIOEqKGa_f39JrlOkFWGf7GBb9vA7BzXlFok_oxObCbv0tDlhrI_EvnR-AVLGSLdM9Za9N1j8ie_HIkN1g8PimtKq4wM1Xs8gkHVEnePpZ1pu3zcF9u3RQalb8VyI7-l6VseypXCmFzaGS8tRzilngC_x28Zv0vYy9z7fXYac2jHq3ijy87FhdBFYAEpO5SDtedfboFod3QHYApnzymf2j1KRnvonFwtXeKgUHoXgCN-9QmK0aQUasaPMFmp0ZTi_xO8BxBa7WSgnqxSFZBKoL3Pnb2YpI6nsAu9dx300GYiBpcD7aDAwMI'
                  }
            }).then(res => {
                console.log(res);
                this.userLoading = false;
                this.usersData = [];

                res.data.data.data.forEach(element => {
                    console.log(element);
                    this.usersData.push({
                        name: element.user.first_name,
                        fName: element.user.last_name,
                        mobile: element.user.mobile,
                        meter: element.area,
                        title: element.project.title,
                        amount: JSON.parse(element.invoice_details).total_amount,
                        tAmount: JSON.parse(element.invoice_details).pure_amount,
                        date: this.converDate(element.created_at),
                        wallet: element.user.wallet.balance,
                        cardNumber: element.user.bank_account?.card_number,
                        sheba: element.user.bank_account?.iban_number,
                      },)
                });


            }).catch(err => {
                console.log(err);
                this.userLoading = false;
            })
        }

    }
});