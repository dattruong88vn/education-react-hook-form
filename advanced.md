## Advanced With React Hook Form

#### Yup library

###### Giới thiệu

Trong ví dụ ở file `YoutubeForm.tsx`, chúng ta đã validation với `react-hook-form`. Tất cả các rule validation đều do chúng ta quy định và cấu hình trong object được truyền vào function `register`. Chúng ta phải define chi tiết từng thông báo và pattern nếu có để validate.

Yup là một thư viện giúp chúng ta định nghĩa các schema cho form, trong schema yup hỗ trợ các rule để validate form thông qua các method có sẵn.

Ví dụ về validate email.

- Sử dụng độc lập `react-hook-form`:

```
<input
  type="email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Invalid email format",
    },
  })}
/>
```

- Kết hợp với `yup`

```
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  ...
  email: yup.string().email("Email is invalid").required("Email is required")
})

const form = useForm({
  defaultValues: { ... },
  resolver: yupResover(schema)
})

...

<input
  type="email"
  {...register("email")}
/>
```

###### Thư viện `@hookform/resolvers` để connect `react-hook-form` và `yup`

Khi sử dụng `yup` kết hợp với RHF, chúng ta cần cài đặt thêm thư viện `@hookform/resolvers` để có thể làm cầu nối.

Sau đó import vào component: `import { yupResolver } from "@hookform/resolvers/yup";`

Khai báo vào resolver của RHF:

```
const form = useForm({
  defaultValues: { ... },
  resolver: yupResover(schema)
})
```

#### Zod Library

###### Giới thiệu

`Zod` là một thư viện giúp chúng ta tạo ra schema validation. Nó có chức năng tương tự `Yup`, khác nhau cơ bản về các method.

```
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zop";

const schema = zod.object({
  ...
  email: z.string().email("Email is invalid").noempty("Email is required")
})

const form = useForm({
  defaultValues: { ... },
  resolver: zodResover(schema)
})

...

<input
  type="email"
  {...register("email")}
/>
```

###### Thư viện `@hookform/resolvers` để connect `react-hook-form` và `zod`

Để sử dụng `zod` với RHF chúng ta cũng cần cài thêm thư viện `@hookform/resolvers`

Sau đó import vào component: `import { zodResolver } from "@hookform/resolvers/zod";`

Khai báo vào resolver của RHF:

```
const form = useForm({
  defaultValues: { ... },
  resolver: zodResover(schema)
})
```
