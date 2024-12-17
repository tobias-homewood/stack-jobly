# React App Diagram
Initial sketch of the layout of the app

- ## App
        no props

        state={currentUser, isLoading}

        provideContext={currentUser, setCurrentUser}


    - ### Navbar

            no props

            no state
    - ### Routes

        ##### Authenticated, redirected if not
        - Companies

                no props

                state={companies, isLoading}

            - SearchForm(Form)
            - Company

                    props={name, description, image}

        - CompanyJobsList
            - Job


        - Jobs

            - SearchForm(Form)
            - Job

        - Profile

                no props

                fromContext={currentUser, setCurrentUser}

            - UpdateUserForm (Form)
                ```js
                inputs={username, firstName, lastName, email}
                labels=['username', 'first name', 'last name', 'email']
                submit={name:"Save Changes", onSubmit: updateUser}
                ```
                    



    


#### Not Authenticated, redirected otherwise
- Login/Signup(Form)



## Reused Components
- Form

    Used for the Login/Signup, UpdateUserForm, SearchCompany, SearchJob

        props={inputs, labels, submit(name, onSubmit)}

        state={formData}

- Job

        props={title, companyHandle, salary, equity}
        
        state={hasApplied}

        fromContext={currentUser}