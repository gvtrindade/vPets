import { useFormState } from "react-dom";
import { authenticate } from "../lib/action/auth";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );
  return (
    <form action={formAction}>
      <h1 className={`text-2xl`}>Please log in to continue</h1>

      <div className="w-full">
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="username"
          >
            Username
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="username"
              type="username"
              name="username"
              placeholder="Enter your username"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        arial-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <Button className="mt-4 w-full" aria-disabled={isPending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </form>
  );
}
