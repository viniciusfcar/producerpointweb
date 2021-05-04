import BASE from './base'

export default {
    // user
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

    // producer
    getAllProducers: async (id) => {
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

    updateProducer: async (
        id, name, nickname, birthDate, phone, cpf, email, houseNumber, reference,
        averageCash, zipCode, city, district, uf, street, activity, resultList, period
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: Date(birthDate),
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
                    activityName: activity,
                    period: period
                },
                products: resultList,
                manager: {
                    id: 1,
                }
            }

            let request = await fetch(`${BASE.API}/producers/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request;
        } catch (e) {
            console.log('Erro: updateProducer ' + e)
        }
    },

    deleteProducer: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, { method: 'DELETE' })
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
        }
    },

    // product

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

    updateProduct: async (
        value, label
    ) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                value: value,
                label: label
            }

            let request = await fetch(`${BASE.API}/products/${value}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request;
        } catch (e) {
            console.log('Erro: updateProduct ' + e)
        }
    },

    deleteProduct: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/products/${id}`, { method: 'DELETE' })
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
        }
    },

}