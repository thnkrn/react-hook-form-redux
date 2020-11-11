const SELECT_TYPE = {
  default: '',
  standard: 'standard',
  float: 'float',
}

const SELECT_TYPE_CLASS = {
  [SELECT_TYPE.standard]: 'dropdown__underline',
  [SELECT_TYPE.float]: 'dropdown__float',
}

export { SELECT_TYPE, SELECT_TYPE_CLASS }
