import * as util from "../utils.ts";
import { assertEquals } from "https://deno.land/std@0.175.0/testing/asserts.ts";

const msg = (s: string) => `Checking ${s}`;

Deno.test(msg("colorCodeToHex"), () => {
  const code = util.colorCodeToHex("#fabd2f");
  assertEquals(code, 0xfabd2f);
});

Deno.test(msg("hasSpace"), () => {
  const first = util.hasSpace("");
  const second = util.hasSpace("   hoge");
  const three = util.hasSpace("hoge    ");
  const four = util.hasSpace("   hoge  ");

  assertEquals(first, false);
  assertEquals(second, true);
  assertEquals(three, true);
  assertEquals(four, true);
});

Deno.test(msg("isEmptyString"), () => {
  assertEquals(util.isEmptyString(""), true);
  assertEquals(util.isEmptyString("    "), false);
  assertEquals(util.isEmptyString("hoge"), false);
  assertEquals(util.isEmptyString("   hoge"), false);
  assertEquals(util.isEmptyString("hogefuga  "), false);
});
