import Promise from 'bluebird';
import { Producer, Consumer, Client } from 'kafka-node';

const getProducer = new Promise((resolve, reject) => {
  const client = new Client();
  const producer = new Producer(client);

  producer.on('ready', () => {
    resolve(producer);
  });

  producer.on('error', err => {
    reject(err);
  });
});

const getConsumer = new Promise((resolve, reject) => {
  const client = new Client();
  const consumer = new Consumer(client);

  consumer.on('ready', () => {
    resolve(consumer);
  });

  consumer.on('error', err => {
    reject(err);
  });
});

// Model types
export class User {
  find({ _id }) {
    return getProducer.then(producer => new Promise((resolve, reject) => {
      producer.send([
        {
          topic: 'users',
          messages: [JSON.stringify({
            action: 'find',
            data: { _id },
          })],
        },
      ], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }));
  }
}

export class Widget {
}

// Mock data
const viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';
const widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
  const widget = new Widget();
  widget.name = name;
  widget.id = `${i}`;
  return widget;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: () => widgets,
  User,
  Widget,
};
