const usersLogin = {
  validAdmin: {
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  incorrectAdminEmail: {
    email: 'incorrect@email.com',
    password: 'secret_admin',
  },
  invalidAdminEmail: {
    email: 'email@invalido',
    password: 'secret_admin',
  },
  noAdminEmail: {
    password: 'secret_admin',
  },
  incorrectAdminPass: {
    email: 'incorrect@email.com',
    password: 'secret_incorrect',
  },
  invalidAdminPass: {
    email: 'admin@admin.com',
    password: 'sec'
  },
  noAdminPass: {
    email: 'admin@admin.com',
  },
};

export default usersLogin;
