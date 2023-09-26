Feature: Let`s go to the cinema
    Scenario: To book one place
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day
        When user choose time
        When user choose one place
        When user booked place
        When user check QR
        Then user see text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: To book select place
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day
        When user choose time
        When user choose two place
        When user choose three place
        When user booked place
        When user check QR
        Then user see text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: It is not possible to book
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day
        When user choose time
        When user choose one place
        Then user see button disabled "true"