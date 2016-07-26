const component = {
  name: '',
  introduce: function() { return `Hi! I'm ${this.name}` }
};

const decorator = {
  component: null,
  introduce: function() {
    return this.component ? 
      `${this.component.introduce()}. I'm decorated.` : 
      ''
  }
};

function runExample() {
  const introduceComponent = c => console.log(c.introduce());

  const comp = Object.assign({}, component, { name: 'Component' });
  const decoratedComp = Object.assign({}, decorator, { component: comp });

  introduceComponent(comp);
  introduceComponent(decoratedComp);
}

runExample();