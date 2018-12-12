let id = 0;
const c1 = {
  id: id++,
  name: 'Matthew James Davis',
  email: 'matt.davis@aurelia.io'
};
const c2 = {
  id: id++,
  name: 'John Doe',
  email: 'email@example.com'
};
const c3 = {
  id: id++,
  name: 'Yamada Taro',
  phone: '090-0000-0000'
};
const contacts = [c1, c2, c3];

const methods = {
  'get': {
    'api/contacts': () => contacts,
    'api/contacts/(\\d+)': (id) => contacts.find(c => c.id == id)
  },
  'post': {
    'api/contacts': ({ id, name, email, phone }) => {
      const contact = { id, name, email, phone };
      if (!contact.id) {
        contact.id = id++;
        contacts.push(contact);
      }
      return contact;
    }
  },
  'delete': {
    'api/contacts/(\\d+)': (id) => {
      const index = contacts.findIndex(c => c.id == id);
      const found = index !== -1;
      if (found) {
        contacts.splice(index, 1);
      }
      return found;
    }
  }
};

const handle = function handle(method, url, data?) {
  return new Promise(resolve => {
    let result;
    for (let re in methods[method]) {
      const match = url.match(new RegExp(`^${re}$`, 'i'));
      if (match) {
        result = methods[method][re](data || match[1], data ? match[1] : undefined);
        break;
      }
    }
    setTimeout(() => resolve({ json: () => Promise.resolve(result) }), 500);
  });
}

export class MockHttpClient {
  get(url) {
    return handle('get', url);
  }
  post(url, data) {
    return handle('post', url, data);
  }
  delete(url) {
    return handle('delete', url);
  }
}
