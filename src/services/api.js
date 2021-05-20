import BASE from './base'

export default {

    BASE: BASE,
    
    // GET
    onSignIn: async (email, password) => {
        try {
            const request = await fetch(`${BASE.API}/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            return request

        } catch (e) {
            console.log('Error: onSignIn ' + e)
        }
    },

    getAllProducers: async () => {
        try {
            const request = await fetch(`${BASE.API}/producers`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            return request
        } catch (e) {
            console.log('Erro: getAllProducers ' + e)
        }
    },

    getProducer: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            return request
        } catch (e) {
            console.log('Erro: getAllProducers ' + e)
        }
    },

    getAllProducts: async () => {
        try {
            const request = await fetch(`${BASE.API}/products`) || []
            return request
        } catch (e) {
            console.log('Erro: getAllProducts ' + e)
        }
    },

    getProduct: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/products/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            return request;
        } catch (e) {
            console.log('Erro: getProduct ' + e)
        }
    },

    getAllActivities: async () => {
        try {
            const request = await fetch(`${BASE.API}/activities`) || []
            return request
        } catch (e) {
            console.log('Erro: getAllActivities ' + e)
        }
    },

    getActivity: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/activities/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            return request;
        } catch (e) {
            console.log('Erro: getProduct ' + e)
        }
    },

    getProducersFromProduct: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/products/${id}/producers`) || [];
            return request;
        } catch (e) {
            console.log('Erro: getProduct ' + e)
        }
    },

    getProducersByActivity: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/findByActivity/${id}`) || [];
            return request
        } catch (e) {
            console.log('Erro: getProducersByActivity ' + e)
        }
    },


    getAllManagers: async () => {
        try {
            const request = await fetch(`${BASE.API}/managers`) || []
            return request
        } catch (e) {
            console.log('Erro: getAllManagers ' + e)
        }
    },

    getManager: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/managers/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            return request;
        } catch (e) {
            console.log('Erro: getManager ' + e)
        }
    },

    // UPDATE

    updateProducer: async (
        id, name, nickname, birthDate, phone, cpf, email, houseNumber, reference,
        averageCash, zipCode, city, district, uf, street, activityId, resultList, period,
        manegerId
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: birthDate,
                phone: phone,
                cpf: cpf,
                email: email,
                address: {
                    zipCode: zipCode,
                    city: city,
                    uf: uf,
                    district: district,
                    street: street,
                    houseNumber: houseNumber,
                    reference: reference,
                },
                farmingActivity: {
                    averageCash: parseFloat(averageCash),
                    activityName: {
                        value : activityId
                    },
                    period: period
                },
                products: resultList,
                manager: {
                    id: manegerId,
                }
            }

            let url=`${BASE.API}/producers`;
            let method=`POST`;
            if(id>0){ url+=`/${id}`; method=`PUT` };
            let request = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            })
            return request;
        } catch (e) {
            console.log('Erro: updateProducer ' + e)
        }
    },

    updateProduct: async (
        value, label
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                label: label
            }

            let url=`${BASE.API}/products`;
            let method=`POST`;
            if(value>0){ data.value=value; url+=`/${value}`; method=`PUT` };
            let request = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            })
            return request;
        } catch (e) {
            console.log('Erro: updateProduct ' + e)
        }
    },

    updateActivity: async (
        value, label
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                label: label
            }

            let url=`${BASE.API}/activities`;
            let method=`POST`;
            if(value>0){ data.value=value; url+=`/${value}`; method=`PUT` };
            let request = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            })
            return request;
        } catch (e) {
            console.log('Erro: updateActivity ' + e)
        }
    },

    updateManager: async (
        id, name, nickname, birthDate, phone, cpf, email, role
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: birthDate,
                phone: phone,
                cpf: cpf,
                email: email,
                role : role,
            }

            let url=`${BASE.API}/managers`;
            let method=`POST`;
            if(id>0){ url+=`/${id}`; method=`PUT`; data.id = id;};
            let request = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            })
            return request;
        } catch (e) {
            console.log('Erro: updateManager ' + e)
        }
    },

    // DELETE

    deleteProducer: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
        }
    },

    deleteProduct: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/products/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteProduct ' + e)
        }
    },

    deleteActivity: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/activities/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteActivity ' + e)
        }
    },

    deleteManager: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/managers/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteManager ' + e)
        }
    },

    // PASSWORD RECOVERY

    sendEmal: async (email) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded")

            const formData = new URLSearchParams();
            formData.append('email', email);

            const request = await fetch(`${BASE.API}/recovery/`, {
                method: 'POST',
                headers: headers,
                body: formData.toString()
            })
            console.log(request?.status)
            return request
        } catch (e) {
            console.log('Erro: sendEmail ' + e)
        }
    },

}