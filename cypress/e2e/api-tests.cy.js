describe('API Test', () => {
    it('TC001 - Create user', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                "name": "Davika Hone",
                "job": "Tester"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name','Davika Hone')
            expect(response.body).to.have.property('job','Tester')
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('createdAt')
        })
    })

    it('TC002 - Get Single User', () => {
        cy.request('GET','https://reqres.in/api/users/9')
        .then((response) => {
            expect(response.status).to.eq(200)
            const user = response.body.data
            expect(user).to.have.property('id')
            expect(user).to.have.property('email')
            expect(user).to.have.property('first_name')
            expect(user).to.have.property('last_name')
            expect(user).to.have.property('avatar')
            expect(response.body.support).to.have.property('url')
            expect(response.body.support).to.have.property('text')
        })
    })

    it('TC003 - Update User', async () => {
        const response = await cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/9',
            body: {
                "name": "Jinda Hone",
                "job": "Automate Tester",
            }
       })
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name','Jinda Hone')
            expect(response.body).to.have.property('job','Automate Tester')
            expect(response.body).to.have.property('updatedAt') 
    })

    it('TC004 - Delete User', async () => {
        const response = await cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/9'
        })
        expect(response.status).to.eq(204)
        expect(response.body).to.be.empty
    })
})