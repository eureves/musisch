import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm
} from 'vee-validate'
import {
  confirmed,
  email,
  max,
  max_value,
  min,
  min_value,
  not_one_of,
  required
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('VeeError', ErrorMessage)

    defineRule('required', required)
    defineRule('requiredTos', required)
    defineRule('email', email)
    defineRule('minVal', min_value)
    defineRule('maxVal', max_value)
    defineRule('passwordsMismatch', confirmed)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('excluded', not_one_of)

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} should be at least ${ctx.rule.params[0]}.`,
          max: `The field ${ctx.field} should not be more than ${ctx.rule.params[0]}.`,
          email: `The filed ${ctx.field} should be a valid email.`,
          passwordsMismatch: `The passwords don't match.`,
          requiredTos: `You must accept the Terms of Service.`
        }

        return messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
