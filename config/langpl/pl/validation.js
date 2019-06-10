const required = item => {
    return `Pole ${item} jest wymagane.`;
}

const email = item => {
    return `Pole ${item} musi zawierać poprawny adres email.`;
}

const regex = item => {
    return `Pole ${item} zawiera niepoprawny format danych.`;
}

const unique = item => {
    return `Pole ${item} zawiera wartość, która została już wykorzystana.`;
}

const password = (...opt) => {
    return `Hasło musi składać się z co najmniej ${opt.min} znaków, maksymalnie ${opt.max}, które zawiera conajmniej 1 małą literę, 1 dużą literę, 2 liczby, i 1 specjalny znak.`;
}


