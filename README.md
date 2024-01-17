## useForm

Để tạo ra 1 form trong `react-hook-form` sử dụng hook `useForm`.

```
const form = useForm();
```

#### register

Để register 1 field với react hook form, sử dụng function `register` trong object `form`:

```
const { register } = form;
const dataRegister = register("<field-name>")
```

Object dataRegister gồm có: `name`, `ref`, `onChange` và `onBlur`. Chúng ta cần bind các data này vào field có name tương ứng để `react-hook-form` control được field.

```
<input type="text" {...register('username')}/>
```
