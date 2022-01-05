/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2022 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

import type { IJodit } from '../../../../types';
import { Dom } from '../../../../core/dom';
import { INSEPARABLE_TAGS } from '../../../../core/constants';
import { checkRemoveEmptyParent } from './check-remove-empty-parent';

/**
 * Check possibility inseparable Element can be removed (img, hr etc.)
 *
 * @example
 * ```html
 * <p>first second <img>| stop</p>
 * ```
 * result
 * ```html
 * <p>first second | stop</p>
 * ```
 *
 * @private
 */
export function checkRemoveUnbreakableElement(
	jodit: IJodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	const neighbor = Dom.findSibling(fakeNode, backspace);

	if (
		Dom.isElement(neighbor) &&
		(Dom.isTag(neighbor, INSEPARABLE_TAGS) || Dom.isEmpty(neighbor))
	) {
		Dom.safeRemove(neighbor);
		jodit.s.setCursorBefore(fakeNode);

		if (Dom.isTag(neighbor, 'br')) {
			checkRemoveEmptyParent(jodit, fakeNode, backspace);
		}

		return true;
	}

	return false;
}
