interface InputTarget extends EventTarget {
  value: string
}

export interface TargetEvent extends Event {
  target: InputTarget
}